import {renderIndex,xmlResponse,unavailableSitemap} from '@/lib/seo/segmented-sitemaps';
import {getPublicSitemapPages,indexingEnabled} from '@/lib/seo/public-sitemaps';
export const dynamic='force-dynamic';
export async function GET(){
 if(!indexingEnabled())return new Response('Sitemaps disabled',{status:404,headers:{'X-Robots-Tag':'noindex','Cache-Control':'no-store'}});
 try{return xmlResponse(renderIndex(Object.keys(await getPublicSitemapPages())),300);}catch{return unavailableSitemap();}
}
