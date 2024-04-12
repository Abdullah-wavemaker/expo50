import mobilePartialComponent from './mobilePartial/mobilePartial.component';
import webpartialComponent from './webpartial/webpartial.component';

const components = {
  mobilePartial: {
    type: mobilePartialComponent,
    name: 'mobilePartialComponent',
  },
  webpartial: {
    type: webpartialComponent,
    name: 'webpartialComponent',
  },
};

const configs = [
  { name: 'mobilePartial', type: 'PARTIAL', params: [] },
  { name: 'webpartial', type: 'PARTIAL', params: [] },
];

configs.forEach(p => {
  const component = components[p.name];
  p.component = component.type;
  p.componentName = component.name;
});

export default configs;
