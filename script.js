let objCnv=document.getElementById("cnvMain")
let objCtx=objCnv.getContext("2d")
let intW=window.innerWidth
let intH=window.innerHeight
objCnv.width=intW
objCnv.height=intH

let arrSystems=[]

class clsParticle{
  constructor(fltX,fltY,objCfg){
    this.fltX=fltX
    this.fltY=fltY
    this.fltVX=(Math.random()*2-1)*objCfg.spd
    this.fltVY=(Math.random()*2-1)*objCfg.spd
    this.fltS=objCfg.siz
    this.intL=objCfg.lif
    this.objCfg=objCfg
  }
  upd(){
    this.fltX+=this.fltVX
    this.fltY+=this.fltVY
    this.intL--
  }
  drw(){
    objCtx.beginPath()
    objCtx.arc(this.fltX,this.fltY,this.fltS,0,Math.PI*2)
    objCtx.fillStyle=this.objCfg.col
    objCtx.fill()
  }
}

class clsSystem{
  constructor(fltX,fltY,objCfg){
    this.fltX=fltX
    this.fltY=fltY
    this.objCfg=objCfg
    this.arrP=[]
  }
  upd(){
    if(Math.random()<this.objCfg.rate){
      this.arrP.push(new clsParticle(this.fltX,this.fltY,this.objCfg))
    }
    for(let i=this.arrP.length-1;i>=0;i--){
      let objP=this.arrP[i]
      objP.upd()
      if(objP.intL<=0){this.arrP.splice(i,1)}
    }
  }
  drw(){
    for(let objP of this.arrP){objP.drw()}
  }
}

let objGuiCfg={
  siz:4,
  spd:2,
  col:"#00ffff",
  lif:100,
  rate:0.5,
  add:function(){
    arrSystems.push(new clsSystem(intW/2,intH/2,{...objGuiCfg}))
  }
}

let gui=new dat.GUI()
gui.width=300
gui.add(objGuiCfg,"siz",1,20,1)
gui.add(objGuiCfg,"spd",0.1,10,0.1)
gui.addColor(objGuiCfg,"col")
gui.add(objGuiCfg,"lif",10,500,1)
gui.add(objGuiCfg,"rate",0,1,0.01)
gui.add(objGuiCfg,"add")

function loop(){
  objCtx.fillStyle="rgba(13,13,13,0.3)"
  objCtx.fillRect(0,0,intW,intH)
  for(let objS of arrSystems){
    objS.upd()
    objS.drw()
  }
  requestAnimationFrame(loop)
}

arrSystems.push(new clsSystem(intW/2,intH/2,{...objGuiCfg}))
loop()

window.addEventListener("resize",()=>{
  intW=window.innerWidth
  intH=window.innerHeight
  objCnv.width=intW
  objCnv.height=intH
})
