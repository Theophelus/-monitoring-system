let app = new Vue ({
    el: '#renderLatestRepos',    
    data: {
       userRepos : [],
       project  : []
    },

    mounted:  function() {
        let self = this;
      axios.get('/api/get/repos/latest')
            .then(function (results) {
                if (results.data.success) {
                    let data = results.data.data;
                    for (const current of data) {
                        self.userRepos.push(current)
                    }
                }
            });
            
            axios.get('/api/get/projects')
            .then(function(response){
              if (response.data.success) {
                for (const current of response.data.data) {
                    self.project.push(current)
                }
              }
            })
    },
    
   
    


    

    methods: {
        // filterByProjects:  function (selected) { 
        //     let self = this;
        //     axios.get(`/api/by/project/${selected}`)
        //         .then(function (results) {
        //             self.getProjects =[];
        //             self.getProjects.push(results.data.data)
        //         });
        // },
        filteredForUser : function(projectsForUser) {
            alert("!")
            // alert(projectsForUser);
        }

    }


})