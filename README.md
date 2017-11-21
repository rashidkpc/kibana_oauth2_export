# kibana_oauth2_export
I'm so sorry you need this. There should be a support group for people who have to use this. We have a bunch of ElasticCloud instances with a ton of data locked behind Google oauth. There's no good way to get that data into your own instance, I know.

And there still isn't.

This is a bad way to do it though!

This takes an index name, and an the value of an *_oauth2_proxy* cookie, and uses that to scroll a cloud instance, and dump it into a file. LOL. It doesn't handle queries or mappings or any of that jazz. Deal with it. To get that cookie you'll need to dive into your browser debugger. Deal with it. 

Example:

```
npm start --  
  --instance='https://someinstance.whatever.elastic.co'  
  --index='happy-or-not'  
  --cookie='TROLLOOLOLOLLOLOLOLOLMQVZtVLZkHELICOPTERVmZ0tvQ0clNpTROLLOLOLOLLOLONVI1NWtZSXhMSTJNMGdiTHZOTROLOLOLOLOLOL0NUx4NGp1dFkc1TROLOLOLOLOL8GQSzD8GXoh2Bo='  
  --filename=foo.json  
```
