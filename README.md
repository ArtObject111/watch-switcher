**Deployed project link:**

https://artobject111.github.io/watch-switcher

**Application functionality:**
1. Dispalaying watches block, which consists of analog round clock at the top, digital one in the middle and selector-list at the bottom relative watch block.
   In the right corner of relative block a "cross" symbol places, deleting watch block. Оn the right side of the block "plus" symbol places, adding 
   one more watch block.
2. Using process. Default two watches blocks are displayed after first starting app. Value of selector contain the first option all over list. General maunt elements, contained in the selector is 11. Вepending on a selector value, hands of analog clocks position and digital watches value changes.
3. App allows to add one more watch block by way clicking on the symbol "plus". Maximal displayed watches amount is limites and equals "11". Upon reaching this value
   notification banner appears.
4. Deleting process staring after click "plus" symbol, which appears only watch block is hovered with cursor. This process has selective charecter, not sequential.
   If all watch blocks are deleted notification banner appears.
5. There is preloader showing procces of loading get request to the API.

**Technologies**
1. Axios and redux-thunk were used for sending get request to the API.
2. Redux for storage BLL and FLUX realisation.
3. react-router-dom for rending code.