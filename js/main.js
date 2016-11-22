var app = angular.module('app', []);


app
    .filter('whatCity', function () {
        return function (input, city) {
            var out = [];
            if (city !== "all" && angular.isDefined(city)) {
                angular.forEach(input, function (user) {
                    if (user.ville.toLowerCase() === city.toLowerCase()) {
                        out.push(user);
                    }
                });
            } else {
                return input;
            }

            return out;
        };
    })
    .filter('lowerThan', function () {
        var maxage = 18;

        // input le tableau, max le checkbox
        return function (input, max) {
            // si checkbox = true
            if (max == true) {
                return input.filter(function (user) {
                    return user.age >= 18
                });
            }

            return input;

        }
    })
    .controller('mainCtrl', function ($scope, $log) {

        var checkSport = {};
        console.log(checkSport);

        //créer long lat
        var latlng = new google.maps.LatLng(45.771944, 4.890171);

        //objet contenant des propriétés avec des identificateurs prédéfinis dans Google Maps permettant
        //de définir des options d'affichage de notre carte
        var options = {
            center: latlng,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };



        //constructeur de la carte qui prend en paramêtre le conteneur HTML
        //dans lequel la carte doit s'afficher et les options
        var carte = new google.maps.Map(document.getElementById("carte"), options);

        var marker = new google.maps.Marker({
            position: latlng,
            map: carte,
            title: 'Hello World!'
        });
        // https://openclassrooms.com/courses/google-maps-javascript-api-v3
        // https://developers.google.com/maps/documentation/javascript/geocoding?hl=FR

        $scope.suppr = function (user) {
            $scope.users.splice($scope.users.indexOf(user), 1);
        }


        $scope.userSort = function () {
            // Tri coissant
            if ($scope.triUser === 0) {
                $scope.users.sort(tri);
                console.log($scope.users[0].age)

                // Tri décroissant
            } else {
                $scope.users.reverse(tri)
                console.log($scope.users[0].age)
            }

            // Fonction éxécutant le tri
            function tri(a, b) {
                return (a.age > b.age) ? 1 : -1;
            }
        } // Fin fonction tri







        $scope.users = [

            {
                nom: 'Marin',
                prenom: 'Flo',
                age: 32,
                ville: 'Lyon',
                sexe: true,
                img: 'http://fr.web.img3.acsta.net/r_1280_720/medias/nmedia/18/35/18/13/18369683.jpg'
            },
            {
                nom: 'Guy',
                prenom: 'Elodie',
                age: 28,
                ville: 'marseille',
                sexe: false,
                img: 'https://superbobine.files.wordpress.com/2013/05/rrrrrrr2.jpg'
            },
            {
                nom: 'laloa',
                prenom: 'Milford',
                age: 35,
                ville: 'paris',
                sexe: true,
                img: 'http://fr.web.img4.acsta.net/videothumbnails/15/03/05/15/07/193467.jpg'
            },
            {
                nom: 'Casol',
                prenom: 'tibo',
                age: 40,
                ville: 'Marseille',
                sexe: true,
                img: 'https://i.ytimg.com/vi/5aO6vqOqMN4/maxresdefault.jpg'
            },
            {
                nom: 'forme',
                prenom: 'lio',
                age: 17,
                ville: 'Lyon',
                sexe: true,
                img: 'https://i.ytimg.com/vi/5aO6vqOqMN4/maxresdefault.jpg'
            }
        ];



        $scope.moyenneAge = function () {

            if ($scope.users.length) {
                var somme = 0;

                $scope.users.forEach(function (user) {
                    somme = somme + user.age;
                });

                return Math.round(somme / $scope.users.length);
            }

            return "Aucun utilisateurs";
        }



        $scope.imgControl = function () {
            var myRegex = /\.(gif|jpg|jpeg|tiff|png)$/i
            if (!myRegex.test($scope.avatar)) {
                $scope.avatar = 'default.jpg';
            }

        };


        $scope.ajouterUser = function () {

            console.log($scope.checkSport);
            $scope.sports = [];

            angular.forEach($scope.checkSport, function (value, key) {
                if (value == true) {
                    $scope.sports.push(key);
                }
            });

            if (!$scope.sports.length) {
                $scope.sports = [''];
            }

            $log.warn($scope.sexe);
            $scope.users.push(
                {
                    nom: $scope.nom,
                    prenom: $scope.prenom,
                    sexe: $scope.sexe,
                    age: $scope.age,
                    ville: $scope.ville,
                    img: $scope.avatar,
                    sports: $scope.sports
                });
            $scope.nom = '';
            $scope.prenom = '';
            $scope.sexe = '';
            $scope.age = '';
            $scope.ville = '';
            $scope.avatar = '';
        }

    });