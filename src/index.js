function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let obj={
        "-":(a,b)=>(+a)-(+b),
        "+":(a,b)=>(+a)+(+b),
        "*":(a,b)=>a*b,
        "/":(a,b)=>{
            if (b==0) throw Error("TypeError: Division by zero.")
            return a/b;
        }
    };
    let mus=[];
    let musNer=[];
    let musOp=[];
    let num="";
      for (let i=0; i<expr.length; i++){
       if (!isNaN(expr[i])&&expr[i]!=" "){
           num+=expr[i];
         }else{
            musNer.push(num);
            musNer.push(expr[i]);
            num="";
         }
        if (i==expr.length-1) musNer.push(num);
    }
    while (musNer.includes("")||musNer.includes(" ")){
       if(musNer.includes("")) musNer.splice(musNer.indexOf(""),1);
       if(musNer.includes(" ")) musNer.splice(musNer.indexOf(" "),1);
    }
    for (let i=0; i<musNer.length; i++){
        if (musNer[i]=="-"){
            musNer.splice(i,1,"+",-1,"*");
        }
        if ((musNer[i]=="*"||musNer[i]=="/")&&(musOp[musOp.length-1]=="*"||musOp[musOp.length-1]=="/")){
            mus.push(musOp[musOp.length-1]);
            musOp.pop();
        }else if (musNer[i]=="+"){
            while (musOp[musOp.length-1]!=undefined&&musOp[musOp.length-1]!="("){
            mus.push(musOp[musOp.length-1]);
            musOp.pop();
            }
        }
        if (!isNaN(musNer[i])){
            mus.push(musNer[i]);
            continue;
        }else if (musNer[i]==")"){
            if (musOp.includes("(")){
            while (musOp[musOp.length-1]!="("){
                mus.push(musOp[musOp.length-1]);
                musOp.pop();
            }
            if (musOp[musOp.length-2]=="-"){
                mus.push(-1);
                mus.push("*");
                mus.push("+");
                musOp.pop();
                musOp.pop();
            } else{
                musOp.pop();
            }
        }else{
            throw Error("ExpressionError: Brackets must be paired");
        }
        } else {
            musOp.push(musNer[i]);
        }
    }
    mus.push(...musOp.reverse());
    console.log(expr);
    console.log(mus);
    if (mus.includes("(")) throw Error("ExpressionError: Brackets must be paired");
    for (let i=0; i<mus.length; i++){
       if (obj.hasOwnProperty(mus[i])) {
            mus.splice(i-2,3,obj[mus[i]](mus[i-2],mus[i-1]));
            i=i-2;
        }
    }
   return mus[0];
}
module.exports = {
    expressionCalculator
}
