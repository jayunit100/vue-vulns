# vue-vulns
vue vulnerability visualization

## Vasily !  

Ritght now, the UI for this is really annoyingly cludgey.  Click a namespace, it shows you pods, click a pod, it shows you vulnerabilities.

Run this in your terminal:

```
git clone https://github.com/jayunit100/vue-vulns
cd vue-vulns
open index.html
```

Now that you see the shitty, hierarchical UI for browsing container vulneratbility, try to make it cute...

### One possibility 

Make each namespace a card, so you click on it, and it shows you the vulns from all pods added up...

```
|------------| |-----------|
| namespaceb | | namespacec|
| vulns=1    | |   vulns=2 |
|------------| |-----------|

|------------|
| namespace  |
| vulns=9    | 
|------------|

```

The data model is embedded in the app itself here, we'll work on glue monday/tuesday.
