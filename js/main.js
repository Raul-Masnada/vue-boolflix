function init() {
    new Vue({
        el:"#app",

        data:{
            actors:[],
            actorsTV: [],
            movies: [],
            tvSeries: [],
            searched: ""
        },

        methods:{
            getApi: function () {
                if (this.searched) {
                    this.actors=[];
                    axios.get('https://api.themoviedb.org/3/search/movie', {
                        params: {
                            'api_key': '2f3534dcf5f979978d804c9f20678b53',
                            'query': this.searched
                        }
                    })
                    .then(data =>{
                        const moviesArray = data.data.results;
                        this.movies = moviesArray;
                        for (let i = 0; i < this.movies.length; i++) {
                            const film = this.movies[i];
                            this.getFilmName(film.id)
                        }
                    })
                    .catch(() => console.log('error'));

                    axios.get('https://api.themoviedb.org/3/search/tv', {
                        params: {
                            'api_key': '2f3534dcf5f979978d804c9f20678b53',
                            'query': this.searched
                        }
                    })
                    .then(data =>{
                        const seriesArray = data.data.results;
                        this.tvSeries = seriesArray;
                        for (let i = 0; i < this.tvSeries.length; i++) {
                            const film = this.tvSeries[i];
                            this.getTVName(film.id)
                        }
                    })
                    .catch(() => console.log('error'));


                }else {
                    this.popular();
                }
            },

            showFlag: function (language) {
                if (language == "en" || language == "it" || language == "es" || language == "ru" || language == "de" || language == "ca") {
                    return '<span>Language: </span><img src="img/' + language +'.jpg">'
                }else {
                    return "<span> Language: " + language +"</span>"
                }
            },

            poster: function (img) {
                if (!img) {
                    return '<img src=img/unknown.jpg>'
                }else {
                    return '<img src="https://image.tmdb.org/t/p/w342' + img +'">'
                }
            },

            convertVote: function (voteDecimal) {
                return parseInt(Math.round(voteDecimal/2));
            },

            slicer: function (text) {
                if (!text) {
                    return "overview non disponibile"
                }else if (text.length > 300) {
                    return text.slice(0,300) + '...';
                }else {
                    return text;
                }
            },

            popular: function () {
                axios.get('https://api.themoviedb.org/3/movie/popular', {
                    params: {
                        'api_key': '2f3534dcf5f979978d804c9f20678b53',
                        'page': '1'
                    }
                })
                .then(data =>{
                    const moviesArray = data.data.results;
                    this.movies = moviesArray;
                    for (let i = 0; i < this.movies.length; i++) {
                        const film = this.movies[i];
                        this.getFilmName(film.id)
                    }
                })
                .catch(() => console.log('error'));

                axios.get('https://api.themoviedb.org/3/tv/popular', {
                    params: {
                        'api_key': '2f3534dcf5f979978d804c9f20678b53',
                        'page': '1'
                    }
                })
                .then(data =>{
                    const moviesArray = data.data.results;
                    this.tvSeries = moviesArray;
                    for (let i = 0; i < this.tvSeries.length; i++) {
                        const film = this.tvSeries[i];
                        this.getTVName(film.id)
                    }
                })
                .catch(() => console.log('error'));
            },

            getFilmName: function (id) {

                axios.get('https://api.themoviedb.org/3/movie/' + id + '/credits',{
                    params: {
                        'api_key': '2f3534dcf5f979978d804c9f20678b53',
                    }
                })
                .then(data=>{
                    const cast = data.data.cast;
                    const namesArray = [];
                    for (let i = 0; i < 5; i++) {
                        const actor = cast[i];
                        namesArray.push(actor.name + ",")
                    }
                    this.actors.push(namesArray);

                })
                .catch(()=>this.actors.push('Cast non disponibile'));
            },

            getTVName: function (id) {

                axios.get('https://api.themoviedb.org/3/tv/' + id + '/credits',{
                    params: {
                        'api_key': '2f3534dcf5f979978d804c9f20678b53',
                    }
                })
                .then(data=>{
                    const cast = data.data.cast;
                    const namesArray = [];
                    for (let i = 0; i < 5; i++) {
                        const actor = cast[i];
                        namesArray.push(actor.name + ",")
                    }
                    this.actorsTV.push(namesArray);

                })
                .catch(()=>this.actorsTV.push('Cast non disponibile'));
            },

            getActors: function (ind) {
                return this.actors[ind]
            },

            getTVActors: function (ind) {
                return this.actorsTV[ind]
            }
        },

        mounted: function () {
                this.popular();
        },

    });
}

document.addEventListener('DOMContentLoaded', init);
