const getCrafts = async () => {
    try {
      return (await fetch("https://server-get-post-rmc0.onrender.com/api/crafts/")).json();
    } catch (error) {
      console.log(error);
    }
  };
  
  const showCrafts = async () => {
    let crafts = await getCrafts();
    let craftsDiv = document.getElementById("crafts-list");
    craftsDiv.innerHTML = "";
    crafts.forEach((craft) => {
      const section = document.createElement("section");
      section.classList.add("craft");
      craftsDiv.append(section);
  
      const a = document.createElement("a");
      a.href = "#";
      section.append(a);
  
      const img = document.createElement("img");
      img.src = "https://server-get-post-rmc0.onrender.com/" + craft.image;
      a.append(img);
  
      a.onclick = (e) => {
        e.preventDefault();
        displayDetails(craft);
      };
    });
  };
  
  const displayDetails = (craft) => {
    openDialog("craft-details");
    const craftDetails = document.getElementById("craft-details");
    craftDetails.innerHTML = "";
    craftDetails.classList.remove("hidden");
  
    const craftInner = document.createElement("div");
    craftInner.classList.add("craft-inner");
  
    const img = document.createElement("img");
    img.src = "https://server-get-post-rmc0.onrender.com/" + craft.image;
    craftInner.append(img);
  
    const description = document.createElement("div");
    description.classList.add("description");
  
    const h3 = document.createElement("h3");
    h3.innerHTML = craft.name;
    description.append(h3);
  
    const p = document.createElement("p");
    p.innerHTML = craft.description;
    description.append(p);
  
    const ul = document.createElement("ul");
    ul.innerHTML = "Supplies";
    description.append(ul);
  
    craft.supplies.forEach((supply) => {
      const li = document.createElement("li");
      li.innerHTML = supply;
      ul.append(li);
    });
  
    craftInner.append(img);
    description.append(ul);
    craftDetails.append(craftInner);
    craftDetails.append(description);
  };
  
  const addCraft = async (e) => {
    e.preventDefault();
    const form = document.getElementById("add-craft-form");
    const formData = new FormData(form);
    let response;
    formData.append("supplies", getSupplies());
  
    console.log(...formData);
  
    response = await fetch("/api/crafts", {
      method: "POST",
      body: formData,
    });
  
    //successfully got data from server
    if (response.status != 200) {
      console.log("Error posting data");
    }
  
    await response.json();
    resetForm();
    document.getElementById("dialog").style.display = "none";
    showCrafts();
  };
  
  const getSupplies = () => {
    const inputs = document.querySelectorAll("#supplies-boxes input");
    let supplies = [];
  
    inputs.forEach((input) => {
      supplies.push(input.value);
    });
  
    return supplies;
  };
  
  const resetForm = () => {
    const form = document.getElementById("add-craft-form");
    form.reset();
    document.getElementById("supplies-boxes").innerHTML = "";
    document.getElementById("img-prev").src = "";
    
  };
  const openDialog = (id) => {
    document.getElementById("dialog").style.display = "block";
    document.querySelectorAll("#dialog-details > *").forEach((item) => {
      item.classList.add("hidden");
    });
    document.getElementById(id).classList.remove("hidden");
  };
  
  const showCraftForm = (e) => {
    e.preventDefault();
    resetForm();
    openDialog("add-craft-form");
  };
  
  const addSupply = (e) => {
    e.preventDefault();
    const section = document.getElementById("supplies-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);
  };
  
  
  
  showCrafts();
  document.getElementById("add-craft-form").onsubmit = addCraft;
  document.getElementById("add-link").onclick = showCraftForm;
  document.getElementById("add-supplies").onclick = addSupply;
  
  document.getElementById("img").onchange = (e) => {
    if (!e.target.files.length) {
      document.getElementById("img-prev").src = "";
      return;
    }
    document.getElementById("img-prev").src = URL.createObjectURL(
      e.target.files.item(0)
    );
  };





