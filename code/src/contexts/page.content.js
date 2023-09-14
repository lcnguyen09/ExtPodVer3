import { set } from "lodash";
import $ from "jquery";

// export function retrieveWindowVariables(variables: string) {
//     let ret: any = "";
//     const scriptContent = `"undefined"!=typeof ${variables}&&document.getElementsByTagName("body")[0].setAttribute("tmp_${variables}",JSON.stringify(${variables}));`
//     const script = document.createElement('script');
//     script.id = 'tmpScript';
//     script.appendChild(document.createTextNode(scriptContent));
//     (document.body || document.head || document.documentElement).appendChild(script);
//     ret = $("body").attr("tmp_" + variables)
//     $(script).remove();
//     try {
//         return JSON.parse(ret);
//     } catch (error) {
//         return ret
//     }
// }