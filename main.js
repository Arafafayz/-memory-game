document.querySelector(".control-buttons span").onclick=function(){
    let yourName = prompt("whats your name");
if(yourName == "" || yourName == null){
    document.querySelector(".info-container .name span").innerHTML="undefind"

}else{
    //set name to your name
     document.querySelector(".info-container .name span").innerHTML=yourName
}
//remove splash screen 
    document.querySelector(".control-buttons").remove();
    //
     document.getElementById("success").play();
}
// عمل وقت ثانيه واحده فقط
let duration =1000;

let blockscontainer=document.querySelector(".memory-game-blocks");
let blocks =Array.from(blockscontainer.children)//هنا جبنا مصفوفه من العناصر داخل البولكس الى هيا لاصور 
// console.log(blocks)//لكن مصفوفه البلوك لسه لم يتم عمل اسبريد للعناصر

let orderRange =[...Array(blocks.length).keys()];//  هنا تم عمل اسبريد للعناصر وبقى عندى مصفوفه تحتوى على 20عنصر  
// console.log(orderRange)//مصفوفوه العناصر 
shffule(orderRange)//هنا استخدمت الفنكشن الى تحت بتاعت السفل علشان تدينى قيم عشوائيه 
//add order css property to game blocks
// console.log(orderRange)//بعد استدعاء المصفوفه تم عمل توزيع عشوائى للعناصر 
// عمل لووب على عناصر البلوك علشان اضيف ليهم رقم معين بأستخدام خاصيه الاوردر فى الفليكس تبع سى اساس 
blocks.forEach((block, index )=>{
   
    block.style.order = orderRange[index];//ده هيدينى ترتيب البلوكات من مصفر الى 19 الى هما 20 صوره عندى 
    //Add CLick Event 
    block.addEventListener("click",function(){
        // trigger the flip Block function
        flipBlock(block)
    })


    })
// flip block function
function flipBlock(selectBlock){
    // add class is flipped
    selectBlock.classList.add("is-flipped")
    //collect all flipped cards
    let allflippedblocks =blocks.filter(flippedblock => flippedblock.classList.contains("is-flipped"))
    //if there two selected blocks
    if(allflippedblocks.length === 2){
        //معناها لو لقيت اتنين من البلوك عليهم نفس الكلاس وقف الضغط
        // Stop clicking function
        stopClicking();

        // check matchedblock function
        checkmatchedBlocks(allflippedblocks[0],allflippedblocks[1])
          document.getElementById("success").play();
    }
}
// Stop clicking function
function stopClicking(){
    // add class no clicking on main container
    blockscontainer.classList.add("no-clicking")//هنعمل وقف خاصيه الكليك فى السى اس اس
    setTimeout(()=>{
/// Remove Class no clicking After the duration
blockscontainer.classList.remove("no-clicking")
    },duration)


}
// check matched blocks 
function checkmatchedBlocks(firstblock,secondblock){
    let triesElement=document.querySelector(".tries span")
    if(firstblock.dataset.tecnology === secondblock.dataset.tecnology ){
        //
        firstblock.classList.remove("is-flipped");
        secondblock.classList.remove("is-flipped");
        // add class name matched;
        firstblock.classList.add("has-match");
        secondblock.classList.add("has-match");
      
    }else{
        triesElement.innerHTML=parseInt(triesElement.innerHTML) + 1;
        setTimeout(()=>{
          firstblock.classList.remove("is-flipped");
         secondblock.classList.remove("is-flipped");
        },duration)
         document.getElementById("success").play();
       
    }
    if( triesElement.innerHTML == 2){
       
        let endGame= document.querySelector(".faill");
         let spanendGame= document.querySelector(".faill span")
         spanendGame.innerHTML="Game over"
         endGame.appendChild(spanendGame);
        setTimeout(()=>{
        endGame.classList.add("endgame") 
        },duration)
             
    }
    document.getElementById("lose").play();

}

//shfule function
function shffule(Array){
//setting vars
let current =Array.length,
temp,
random;

while(current>0){
    //get Random Number
    random= Math.floor(Math.random()*current);
    //Decrease length By one
    current --;
    //[1] save current element in stash
    temp=Array[current]
    //[2] current element = random element 
    Array[current] =Array[random]
    //[3] random element = get element from stash
    Array[random]= temp
}
return Array
}