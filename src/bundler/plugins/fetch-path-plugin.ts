import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';
const fileCache = localForage.createInstance (
  {
    name:'fileCache'
  }
);

export const fetchPlugin =(input:string) =>{
return{
    name: 'fetch-plugin' ,
    setup(build: esbuild.PluginBuild){
    build.onLoad({ filter: /(^index\.js$)/}, ()=> {
        return{
            loader:'jsx',
            contents:input,
        }
    });

build.onLoad({filter :/.*/} , async (args:any) => {
    const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cacheResult){
         return cacheResult;
        }
});
    build.onLoad({filter:/.css$/},async(args:any) =>{
    const {data, request} = await axios.get(args.path);
    //    console.log(args.path);

    
    const escaped = data.replace(/\n/g , '').replace(/"/g,'\\"').replace(/'/g,/\\'/)
     const contents=
`
const style = document.CreateElement('style');
style.innerText = '${escaped}';
document.head.appendChild(style);
` ;
const  result:esbuild.OnLoadResult ={
    loader:'jsx',
    contents ,
    resolveDir: new URL('./' ,request.responseURL).pathname,
    
  }
await fileCache.setItem(args.path , result);
return result;
  //  else {
  //   return {
  //     loader: 'jsx',
  //     contents: 'export default "hi there!"',
  //   };
  // }
});
build.onLoad({ filter: /.*/ }, async (args: any) => {
   
    const { data, request } = await axios.get(args.path);

    const result: esbuild.OnLoadResult = {
      loader: 'jsx',
      contents: data,
      resolveDir: new URL('./', request.responseURL).pathname,
    };
    await fileCache.setItem(args.path, result);

    return result;
  });
        // if (args.path === 'index.js') {
        //   return {
        //     loader: 'jsx',
        //     contents: input,
        //   };
        // }
  
        // console.log(request);
        // console.log(data);
      

    },
}


}