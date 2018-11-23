Vue.component('rank-wars', {
    props: ['rank'],
    data: function () {
        return {
            getCodeWarRanks: []
        }
    },

    mounted: function () {
        let self = this;
        axios.get('/api/coderwars/users/rank/MrBooi')
            .then(function (results) {
                if (results.data.success) {
                    let data = results.data.data;

                    let getWars = {
                        username: data.name,
                        TotolCompeted: data.codeChallenges.totalCompleted,
                        honor: data.honor,
                    }
                   
                    self.getCodeWarRanks.push(getWars)

                }
                
            })
    },


    template: `
    <div class="panel-body">
    <table class="table table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>Totol Completed</th>
                <th>Language</th>
               
            </tr>
        </thead>
        <tbody>
            <tr v-for="userRank in rank">
                <td>1</td>
                <td> {{userRank.username}} </td>
                <td> {{userRank.TotolCompeted}} </td>
                <td> {{userRank.honor}} </td>
            </tr>
        </tbody>
    </table>
</div>`
});