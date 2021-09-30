class SvelteRailsUJS {
  static serverRender(component_name, props) {
    const requireComponent = require.context('components', true)
    console.log(requireComponent)
    const bundle = requireComponent('./' + component_name).default
    console.log("-------_", bundle)
    const {html} = bundle.render(props)

    return html
  }

  static start() {
    SvelteRailsUJS.mountComponents()

    document.addEventListener('DOMContentLoaded',
      SvelteRailsUJS.mountComponents)

    document.addEventListener('turbolinks:load',
      SvelteRailsUJS.mountComponents)
  }

  static mountComponents() {
    document.querySelectorAll('[data-svelte-class]:not([data-svelte-initialized])')
      .forEach(SvelteRailsUJS.mountComponent)
  }

  static mountComponent(target) {
    const name = target.dataset.svelteClass
    const hydrate = !!target.dataset.hydrate

    let props = {}

    if (target.dataset.svelteProps) {
      props = JSON.parse(target.dataset.svelteProps)
    }

    const requireComponent = require.context('components', true)
    const Component = requireComponent('./' + name).default

    console.debug(Component, {target, props, hydrate});

    const component = new Component({target, props, hydrate})

    target.dataset.svelteInitialized = true
  }
}

// self.SvelteRailsUJS = SvelteRailsUJS

export default SvelteRailsUJS
