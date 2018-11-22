let renderLatestRepos = new Vue({
    el: '.renderLatestRepos',

    data: {
        
        repos: [],
        getProjects: []
    },
    // methods: {
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
    // },
    // methods: {
    //     projects: function () {
    //         // let self = this;
    //         // axios.get('/api/get/projects')
    //         //     .then((results) => {
    //         //         // console.log(results.data);
    //         //         if (results.data.success) {
    //         //             getProjects.push(self.project_name)
    //         //         }
    //         //     });
    //     }
    // },
    // mounted: function () {
    //     let self = this;

    // },
    mounted: function () {
        let self = this;
        axios
            .get('/api/get/students')
            .then(function (results) {
                console.log(results)

                if (results.data.success) {
                    let repos = results.data.data;
                    for (let current of repos) {
                        axios
                            .get(`/api/get/lastest/repos/${current.github_username}`)
                            .then(function (results) {
                                console.log(results)
                                let name = results.data.lastestRepos[0].full_name.split('/');
                              
                                const {
                                    created_at,
                                    updated_at
                                } = results.data.lastestRepos[0];
                                let data = {
                                    full_name: name[0],
                                    project_name: name[1],
                                    created_at: created_at,
                                    updated_at: updated_at
                                }
                                self.repos.push(data);
                            });
                    }
                }
            }),

            axios.get('/api/get/projects')
            .then(function (results) {
                if (results.data.success) {
                    let data = results.data.data;
                    for (const current of data) {



                        self.getProjects.push(current)

                    }
                }
            });


    }
});


let filter = new Vue({

    el: '.filter',

    data: {
        selected: 'hello',
        getProjects: [],
        project: ''
    },
    methods: {
        filterByProjects: function () { 
            console.log(this.selected)
            let self = this;
            axios.get(`/api/by/project/basic`)
                .then(function (results) {
                    self.getProjects =[];
                    console.log(results.data.data);
                    self.getProjects.push(results.data.data)
                });
        }
    },
    mounted: function () {
        let self = this;

    },
    mounted: function () {
        let self = this;
        axios.get('/api/get/projects')
            .then(function (results) {
                if (results.data.success) {
                    let data = results.data.data;
                    for (const current of data) {
                        console.log((current.project_name));
                        self.getProjects.push(current)
                    }
                }
            });


    }

});