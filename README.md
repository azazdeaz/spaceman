It's a React and Flux based workspace manager aiming to implement all the feature that you got use to in modern graphics editors. (like Adobe or Autodesk products)
Work is in progress but the API will look something like this:

```javascript
import {Spaceman, SpacemanStore} from 'spaceman'
import defaultWorkspace './defaultWorkspace'

var workspace = localStoreage.lastWorkspace || defaultWorkspace
Workspace = new SpacemanStore({source: workspace})

Workspace.setTabContent('view', <Viewport/>)
Workspace.setTabContent('tree', <TreeView/>)
Workspace.setTabContent('style', <StyleView/>)
...
Workspace.selectTab('tree');

Workspace.on('change', () => {//on change tabs, resize, etc.
  localStoreage.lastWorkspace = Workspace.model.getSource()
})

React.render(<Spaceman store={Workspace}/>, mountNode)
```

defaultWorkspace.js
```javascript
export default
{type: 'divider', direction: 'row', children: [
  {type: 'divider', direction: 'column', size: 7, children: [
    //Status bar
    {type: 'block', size: 34, sizeMode: 'fix', resizeable: false, children: [
      {type: 'tab', id: 'statusBar', hideableHead: true},
    ]},
    {type: 'divider', children: [
      {type: 'divider', direction: 'row', children: [
        //left Toolbar
        {type: 'divider', size: 1, direction: 'column', collapsed: true, children: [
          {type: 'block', children: [
            {type: 'tab', id: 'assets', icon: 'cloud-upload', label: 'Assets'},
            {type: 'tab', id: 'catalogue', icon: 'cubes', label: 'Catalogue'},
            {type: 'tab', id: 'config', icon: 'cog', label: 'Config'},
          ]},
        ]},
        //Viewport
        {type: 'block', size: 4, children: [
          {type: 'tab', id: 'view', label: 'View', hideableHead: true},
        ]},
      ]}
    ]},
  ]},
  {type: 'divider', size: 1.89, direction: 'column', children: [
    {type: 'block', currTabIdx: 1, children: [
      {type: 'tab', id: 'props', label: 'Props'},
      {type: 'tab', id: 'style', label: 'Style'},
    ]},
    {type: 'block', children: [
      {type: 'tab', id: 'tree', label: 'Navigator'},
    ]},
  ]}
]}
```
