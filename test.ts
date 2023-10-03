import Visign from "./src/Visign";
(async()=>{
    let signer1 = new Visign(1);
    let signer2 = new Visign(1);
    let signer3 = new Visign(100);
    let signer4 = new Visign();
    let signer5 = new Visign();

    let djwt = await signer1.sign({'a':'b'});
    let rjwt = await signer4.sign({'a':'b'});

    console.log('Same signer             ' + await signer1.verify(djwt));
    console.log('Same seed signer        ' + await signer2.verify(djwt));
    console.log('Different seed signer   ' + await signer3.verify(djwt));

    console.log('Same noseed signer      ' + await signer4.verify(rjwt));
    console.log('Different noseed signer ' + await signer5.verify(rjwt));
})()