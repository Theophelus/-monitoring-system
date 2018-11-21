let renderLatestRepos = new Vue({
    el: '.renderLatestRepos',
    data: {
        repos: [],
    },
    methods: {
        // display: function () {
        //     let self = this;
        //     axios
        //         .get('/api/get/students')
        //         .then(function (results) {

        //             if (results.data.success) {
        //                 let repos = results.data.data;
        //                 for (let current of repos) {
        //                     axios
        //                         .get(`/api/get/lastest/repos/${current.github_username}`)
        //                         .then(function (results) {
        //                             self.repos.push(results.data.lastestRepos[0]);
        //                         });
        //                 }
        //             }
        //         })

        // }
    },

    mounted: function () {
        let self = this;
            axios
                .get('/api/get/students')
                .then(function (results) {

                    if (results.data.success) {
                        let repos = results.data.data;
                        for (let current of repos) {
                            axios
                                .get(`/api/get/lastest/repos/${current.github_username}`)
                                .then(function (results) {    
                                    self.repos.push(results.data.lastestRepos[0]);
                                });
                        }
                    }
                })
    }

});


