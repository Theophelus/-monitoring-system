let app = new Vue({
    el: '#renderLatestRepos',
    data: {
       userRepos : [],
       project  : [],
       userRank:[],
       showRank : false,
       showAdd : false,
       showDashboard: true
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

            axios.get('/api/coderwars/users/rank/MrBooi')
                .then(function (results) {
                    if (results.data.success) {
                        let data = results.data.data;
    
                        let getWars = {
                            username: data.name,
                            TotolCompeted: data.codeChallenges.totalCompleted,
                            honor: data.honor,
                        }
                       
                        self.userRank.push(getWars)
    
                    }
                    
                })
    },
    
   
    


    

    methods: {
        dashBoard: function(){
            this.showDashboard = true;
            this.showAdd = false;
            this.showRank =false; 
        },

        addStudents: function() {
            this.showDashboard = false;
            this.showAdd = true;
            this.showRank =false;
            
        },
        studentsRank: function() {
            this.showDashboard = false;
            this.showAdd = false;
            this.showRank =true;
        },
        filteredForUser : function(projectsForUser) {
            alert("!")
            let self = this;
              self.userRepos = [];
              self.userRepos.push(projectsForUser)
        }

    }


})