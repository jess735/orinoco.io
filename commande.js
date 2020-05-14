// Affichage du numéro de commande avec message de remerciement

function commande(){

    let data = sessionStorage.getItem('order');
    data = JSON.parse(data);
    let prix = sessionStorage.getItem('prix');
    prix = JSON.parse(prix);


    let productContainer = document.getElementById("recap");

    // Création du message de confirmation de commande
    if( data != null ) {
        productContainer.innerHTML = '';
        Object.values(data).map( () => {
            productContainer.innerHTML = 
            `<p>Merci pour votre commande.</p>

            <p>Celle-ci a été enregistrée sous le numéro :  ${data.orderId},
            pour un montant total de ${prix} €.</p>
                
            <p>Toute l'équipe d'Orinoco vous remercie de votre visite.</p>`   
        });    
    } else {
        var div = document.createElement('div');
        div.textContent = "Vous n'avez pas encore validé votre commande";
        ourson.appendChild(div);
    }
}
// remise à zero de tous les sessions Storage.
function retour(){
    sessionStorage.clear();
}
commande();
