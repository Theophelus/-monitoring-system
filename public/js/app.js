

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
                                    let name = results.data.lastestRepos[0].full_name.split('/'); 
                                    const {created_at,updated_at} = results.data.lastestRepos[0];
                                    let data = {
                                        full_name: name[0],
                                        project_name : name[1],
                                        created_at:created_at,
                                        updated_at:updated_at
                                    }
                                    self.repos.push(data);
                                });
                        }
                    }
                })
    }
});


