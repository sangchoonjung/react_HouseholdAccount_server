import bcrypt from 'bcrypt'
!async function () {
    const plain = "1q2w3e4r";
    bcrypt.hash(plain, 10, (err, data) => {
        console.log(err);
        console.log(data);
    })
    //간단하게 한것
    const result = await bcrypt.hash(plain, 10);
    const check = await bcrypt.compare(plain, result);
    console.log(check);
}();