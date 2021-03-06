//var apiURL = 'http://35.202.158.201:3001/model'
var keys_raw = [];
for(var i in model.Pods)
    keys_raw.push(model.Pods[i].Namespace) //model.Pods [i][0]);
var keys = keys_raw.filter(function(item, pos) {
        return keys_raw.indexOf(item) == pos;
})
var demo = new Vue({
  el: '#demo',
  data: {
    //ns: ['d', 'c'],
    ns: keys,
    currentNs: 'default',
    podss: ['pick','something'],
    currentPod: 'none',
    vulns: []
  },

  watch: {
    currentNs: 'fetchData',
    currentPod: 'selectedPod'
  },

  filters: {
    truncate: function(v) {
      var newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function(v) {
      return v.replace(/T|Z/g, ' ')
    }
  },

  methods: {
    fetchData: function() {
      console.log("change ")
      console.log(this.currentNs)
      pods = []
      for(var i in model.Pods) {
        if (model.Pods[i].Namespace == this.currentNs) {
          pods.push(model.Pods[i].Name)
        }
      }
      this.podss=pods
    },
    selectedPod: function() {
      console.log("select!")
      console.log(this.currentPod)
      var modelPod
      for(var i in model.Pods) {
        if(model.Pods[i].Name==this.currentPod){
          modelPod=model.Pods[i]
        }
      }
      console.log("**************")
      console.log("key:")

      console.log("---- "+
        this.currentNs+"/"+JSON.stringify(modelPod.Name))

      pod = model.Pods[this.currentNs+"/"+modelPod.Name]
      console.log("pod:")
      console.log(pod)
      console.log("+++++++++++++++++")
      if (! pod ){
        return
      }
      images = []
      this.vulns=[]
      for(var i in model.Images) {
        //console.log(i)
        if (model.Images[i].ImageNames[0] == pod.Containers[0].Image.Name) {
          var img = model.Images[i]
          console.log("found corresponding image " + JSON.stringify(model.Images[i]))
          for(var l in img.Layers) {
              for(i in model.Layers){
                if(i == img.Layers[l]){
                  console.log("found layer !!!")
                  this.vulns.push(model.Layers[i])
                }
              }
          }
        }
      }

    }

  }
})
