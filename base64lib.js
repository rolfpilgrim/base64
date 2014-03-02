/*
Copyright (c) 2014, Rolf Rost
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Rolf Rost  BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// Rolf Rost, Am Stadtgraben 27, 55276 Oppenheim, Tel.: 06133 573 68 02, ePost: nmqrstx-18@yahoo.de
// by Rolf Rost, 2014-02

var Base64String = {
    b64a: new String('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='),
    res64: new String(),
    encode: function(buffer){
        var mod3 = buffer.byteLength % 3;
        if(mod3 == 2){
            buffer = appendBuffer(buffer, new Uint8Array(1));
        }
        else if(mod3 == 1){
            buffer = appendBuffer(buffer, new Uint8Array(2));
        }
        var uha = new Uint8Array(buffer);
        for(var i = 0; i < buffer.byteLength; i += 3){
            var z1 = uha[i+0];
            var z2 = uha[i+1];
            var z3 = uha[i+2];
            var n1 = z1 >> 2;
            var n2 = (z1 & 3) << 4 | (z2 >> 4);
            var n3 = (z2 & 0x0f) << 2 | (z3 >> 6);
            var n4 = z3 & 0x3F;
            this.res64 = this.res64.concat(this.b64a[n1] + this.b64a[n2] + this.b64a[n3] + this.b64a[n4]);
        }
        if(mod3 == 1) this.res64 = this.res64.replace(/AA$/, '==');
        if(mod3 == 2) this.res64 = this.res64.replace(/A$/, '=');

        return(this.res64);
    },
};



function appendBuffer( buffer1, buffer2 ) {
    var tmp = new Uint8Array( buffer1.byteLength + buffer2.byteLength );
    tmp.set( new Uint8Array( buffer1 ), 0 );
    tmp.set( new Uint8Array( buffer2 ), buffer1.byteLength );
    return tmp.buffer;
}


