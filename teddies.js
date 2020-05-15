//    Connexion à l'API pour récupération des données du serveur
var teddy = function (url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(xhr);
            // alerte si le serveur ne répond pas
            alert("Nous sommes désolé, le serveur ne répond pas ! ")
          };
        };
      };

      xhr.open('GET','http://localhost:3000/api/teddies/', true);
     
      xhr.send();
    });
  };
// affiche une erreur si la requete AJAX ne fonctionne pas
var catchError = function(e){
  console.error('Erreur AJAX', e);
};

//  Récupération des données du serveur grace à la requete précedente

teddy();
var products = function () {
  return teddy('http://localhost:3000/api/teddies/').then(function (response) {
    var products = JSON.parse(response);
    return products;
  });
};
let ourson = document.getElementById('ourson');

  // Affiche dynamiquement de la liste des articles grace à JS

  products().then(function(products){
  console.log(products);
  console.log(products[1]._id);
  console.log(products[1].name);
  console.log(products[1].price);
  console.log(products[1].description);
  console.log(products[1].colors);

  // forEach pour afficher Chaque produits à la suite sous forme de liste
  products.forEach( teddy=> {
  
    var article = document.createElement('article');

      var image = document.createElement('img');
      image.src =  teddy.imageUrl;

        var div = document.createElement('div');
          var nom = document.createElement('h3');
          nom.textContent = teddy.name;

          var prix = document.createElement('h4');
          prix.textContent = 'Prix :';
            var price = document.createElement('p');
            price.textContent = teddy.price/100 + ' €';
    
          var id = teddy._id;

          let link = document.createElement('a');
            link.id = "lien";
            link.href = 'produit.html?id=' + teddy._id;
            link.textContent = "Voir l'ourson";

// mise en place des éléments pour les autres articles affichés en boucle dans le DOM

    ourson.appendChild(article);
    article.appendChild(nom);
    article.appendChild(image);
    article.appendChild(div);
    div.appendChild(prix);
    div.appendChild(price);
    div.appendChild(link)
  });
});

