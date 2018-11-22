VTTCue.component({
    data: () => {
        return {
            getCodeWarRanks: []
        }
    },
    mounted: function() {

    },
    template:  `
    <div class="panel-body">
    
    <table class="table table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>FUsername</th>
                <th>Totol Completed</th>
                <th>Language</th>
                <th>Updated</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="repo in repos">
                <td>1</td>
                <td> {{repo.full_name}} </td>
                <td> {{repo.project_name}} </td>
                <td> {{repo.created_at}} </td>
                <td> {{repo.updated_at}} </td>
            </tr>
        </tbody>
    </table>
</div>

    `
});