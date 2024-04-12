import BasepartialComponent from "./Basepartial/Basepartial.component";
import CommonComponent from "./Common/Common.component";
import leftnavComponent from "./leftnav/leftnav.component";
import partail1Component from "./partail1/partail1.component";
import partialTest1Component from "./partialTest1/partialTest1.component";
import partialTest2Component from "./partialTest2/partialTest2.component";

const components = {
    'Basepartial': {
        type: BasepartialComponent,
        name: 'BasepartialComponent'
    },
    'Common': {
        type: CommonComponent,
        name: 'CommonComponent'
    },
    'leftnav': {
        type: leftnavComponent,
        name: 'leftnavComponent'
    },
    'partail1': {
        type: partail1Component,
        name: 'partail1Component'
    },
    'partialTest1': {
        type: partialTest1Component,
        name: 'partialTest1Component'
    },
    'partialTest2': {
        type: partialTest2Component,
        name: 'partialTest2Component'
    },
};

const configs = [{"name":"Basepartial","type":"PARTIAL","params":[]},{"name":"Common","type":"PARTIAL","params":[]},{"name":"leftnav","type":"LEFTNAV","params":[]},{"name":"partail1","type":"PARTIAL","params":[]},{"name":"partialTest1","type":"PARTIAL","params":[]},{"name":"partialTest2","type":"PARTIAL","params":[]}];

configs.forEach(p => {
    const component = components[p.name];
    p.component = component.type;
    p.componentName = component.name;
});

export default configs;
