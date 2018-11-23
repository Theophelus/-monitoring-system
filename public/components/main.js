let app = new Vue({
    el: '#renderLatestRepos',
    data: {
        userRepos: [],
        userRank: []
    },
    mounted: function () {
        let self = this;
        axios.get('/api/get/repos/latest')
            .then(function (results) {
                // console.log(results.data)
                // console.log(results)
                if (results.data.success) {
                    let data = results.data.data;
                    for (const current of data) {
                        // console.log(current);

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



    }


})