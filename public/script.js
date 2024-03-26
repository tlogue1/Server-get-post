const getCrafts = async() => {
 try {
    return (await fetch("/api/crafts/")).json();
    } catch(error) {
        console.log("Error retrieving data");
    }
};

const showCrafts = async() => {
    const craftsJSON = await getCrafts();
    const craftsDIV = document.getElementById("crafts-div");

    craftsJSON.forEach((craft) => {
        const column = document.createElement("column");
        craftsDIV.append(column);


        const img = document.createElement("img");
        img.src = "http://localhost:3000/" + craft.image;
        column.append(img);
        

        const modal = document.getElementById("myModal");

        const image = document.getElementById("myImg");
        const modalImg = document.getElementById("img01");
        const captionText = document.getElementsByClassName("caption");
        img.onclick = function (){
            modal.style.display= "block";
            modalImg.src = craft.image;

            const name = document.createElement("h1");
            name.innerHTML = craft.name;
            captionText[0].appendChild(name);

            const description = document.createElement("p");
            description.innerHTML =  craft.description;
            captionText[0].appendChild(description);


            /*
            const ul = document.createElement("ul");
            captionText[0].appendChild(ul);

            craft.supplies.forEach((supply) => {
                const li = document.createElement("li");
                li.innerHTML = supplies;
                ul.append(li);
            });
*/
            
            const supplies = document.createElement("p");
            supplies.innerHTML = "Supplies: " +  craft.supplies;
            captionText[0].appendChild(supplies);
            

        }
        const span = document.getElementsByClassName("close")[0];

        span.onclick = function() {
            modal.style.display = "none";
            while (captionText[0].firstChild) {
                captionText[0].removeChild(captionText[0].firstChild);
        }
        }
    });
};
window.onload = () => {

showCrafts();
};