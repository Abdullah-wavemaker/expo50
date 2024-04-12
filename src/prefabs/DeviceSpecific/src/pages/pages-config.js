import MainComponent from './Main/Main.component';

const components = {
  Main: {
    type: MainComponent,
    name: 'MainComponent',
  },
};

const configs = [{ name: 'Main', type: 'PAGE', params: [] }];

configs.forEach(p => {
  const component = components[p.name];
  p.component = component.type;
  p.componentName = component.name;
});

export default configs;
