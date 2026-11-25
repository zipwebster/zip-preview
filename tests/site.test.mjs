import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
import YAML from 'yaml';
const html=fs.readFileSync('dist/index.html','utf8'),$=load(html);
const entries=type=>fs.readdirSync('src/content/'+type).map(f=>JSON.parse(fs.readFileSync('src/content/'+type+'/'+f)));
test('published programmes sort alphabetically and use the correct link type',()=>{
 const programmes=entries('programmes').filter(p=>p.published);
 const names=$('.programme-grid article').map((i,e)=>$(e).attr('aria-label')).get();
 assert.deepEqual(names,programmes.map(p=>p.title).sort((a,b)=>a.localeCompare(b,'en')));
 assert.equal($('.programme-grid a').length,programmes.filter(p=>p.website).length);assert.equal($('.programme-open').length,programmes.filter(p=>!p.website).length);
 $('.programme-open').each((i,e)=>{assert.ok($('#'+$(e).attr('data-overview')).html().includes('ZIP’s role'));});
 assert.equal($('.programme-grid').text().includes('With JETRO'),false);
});
test('only published people appear',()=>{const names=$('#people-view h3').map((i,e)=>$(e).text()).get();assert.deepEqual(names.sort(),entries('people').filter(p=>p.published).map(p=>p.name).sort());});
test('all local image, script and stylesheet files exist',()=>{$('[src],link[href]').each((i,e)=>{const path=$(e).attr('src')||$(e).attr('href');if(path.startsWith('/zip-preview/'))assert.ok(fs.existsSync('dist/'+path.slice('/zip-preview/'.length)),path);});});
test('Decap collections edit the same validated JSON content used by Astro',()=>{const config=YAML.parse(fs.readFileSync('dist/admin/config.yml','utf8'));assert.equal(config.backend.repo,'zipwebster/zip-preview');for(const c of config.collections){assert.ok(fs.existsSync(c.folder));for(const file of fs.readdirSync(c.folder)){const entry=JSON.parse(fs.readFileSync(c.folder+'/'+file));for(const field of c.fields.filter(f=>f.required!==false))assert.ok(field.name in entry,`${file}: ${field.name}`);}}});
