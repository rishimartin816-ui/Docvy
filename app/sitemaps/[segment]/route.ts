import {renderUrlset,xmlResponse,unavailableSitemap} from '@/lib/seo/segmented-sitemaps';
import {getPublicSitemapPages,indexingEnabled,staticSitemapPages} from '@/lib/seo/public-sitemaps';
export const dynamic='force-dynamic';
export async function GET(_request:Request,{params}:{params:{segment:string}}){
 const match=/^(static|directories|specialties|surgeries|content|doctor-profiles|cities|localities|doctor-specialty-city)(?:-([2-9]|[1-9][0-9]+))?\.xml$/.exec(params.segment);
 if(!indexingEnabled()||!match)return new Response('Not Found',{status:404,headers:{'Cache-Control':'no-store'}});
 const group=params.segment.slice(0,-4);
 if(Object.hasOwn(staticSitemapPages,group))return xmlResponse(renderUrlset(staticSitemapPages[group]));
 try{const pages=await getPublicSitemapPages();return Object.hasOwn(pages,group)?xmlResponse(renderUrlset(pages[group]),300):new Response('Not Found',{status:404});}catch{return unavailableSitemap();}
}
