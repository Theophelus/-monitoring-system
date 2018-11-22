let app = new Vue ({
    el: '#renderLatestRepos',    
    data: {
       userRepos : []
    },

    mounted: function() {
        let self = this;
        axios.get('/api/get/repos/latest')
            .then(function (results) {
                console.log(results.data)
                if (results.data.success) {
                    let data = results.data.data;
                    for (const current of data) {
                        self.userRepos.push(current)
                    }
                }
            });
    },

    methods: {
          
       

    }


})