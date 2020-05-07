//    Affichage du panier

function affichagePanier(){

  let data = localStorage.getItem('panier');
  data = JSON.parse(data);


  var total = localStorage.getItem('prixTotal');
  var prixTotal = document.getElementById('total');

  if (total != null) {
    prixTotal.textContent = 'Le montant de votre commande est de : ' + total +  ' €';
    prixTotal.id = 'prixTotal'; 
  } else {
    prixTotal.textContent = 'Le montant de votre commande est de : 0 €';
  }

  let productContainer = document.getElementById("basket");

  if( data == null || total == 0 ) {
    var div = document.createElement('div');
    div.textContent = " Votre panier est vide ";
    basket.appendChild(div);
  } else {
    productContainer.innerHTML = '';
    Object.values(data).map( (teddy) => {
    
      var article = document.createElement('article');
                    
      var image = document.createElement('img');
      image.src =  teddy.img;
              
      var div = document.createElement('div');
      var nom = document.createElement('p');
      nom.textContent = teddy.nom;
      var prix = document.createElement('p');
      prix.textContent = 'Prix: ' + teddy.prix + ' €';  
      var supprime = document.createElement('button');
      supprime.textContent = "supprimer l'article";
      supprime.id = "supprime";
               
      // mise en place des éléments 
    
      basket.appendChild(article);
                              
      article.appendChild(image);
      article.appendChild(div);
                    
      div.appendChild(nom);
      div.appendChild(prix);
      div.appendChild(supprime);

    }); 
  }; 
deleteButtons();
};
affichagePanier();

//  Suppression d'un article
function deleteButtons() {
  let deleteButtons = document.querySelectorAll('#basket #supprime');
  let nomProduit;
  let prixTotal = localStorage.getItem("prixTotal");
  let article = localStorage.getItem('panier');
  article = JSON.parse(article);

  for(let i=0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', () => {
      nomProduit = deleteButtons[i].parentElement.firstChild.textContent;
    
      localStorage.setItem('prixTotal', prixTotal - (article[nomProduit].prix));

      delete article[nomProduit];
      localStorage.setItem('panier', JSON.stringify(article));
      window.location.reload();
      affichagePanier();
    });
  };
};


//  requete finale de commande contenant les informations de contact et les Id produit
function achat() {
  
 let products = [];

  function productId() {
    let panier = JSON.parse(localStorage.getItem('panier'));
    
      if(panier != null) {
          Object.values(panier).map( (teddy) => {
          let id = teddy.id;
          console.log(id);

        });

      };
    };
    productId();
    // Récupérer la valeur des champs
     
    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;

  // Mettre les valeurs dans un objet
   

    let contact = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "address": address,
        "city": city,
    };
    
  let objt = {
    contact,
    products
  };
  

  let achat = JSON.stringify(objt);
  console.log(achat);
  console.log(products);
  
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE) {
      let confirmation = JSON.parse(this.responseText);
      sessionStorage.setItem('order', JSON.stringify(confirmation));
      let prix = localStorage.getItem('prixTotal');
      prix = JSON.parse(prix);
      sessionStorage.setItem('prix', JSON.stringify(prix));
    
      //window.location.href = "commande.html";
      //localStorage.clear();
    };
  };
  
  request.open("post", "http://localhost:3000/api/teddies/order");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(achat, products);
};


