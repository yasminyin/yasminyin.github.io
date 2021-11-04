function settexture() {
  //
  // set up texture and sampler
  //

  texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  var sampler = gl.createSampler();
  gl.bindSampler(0, sampler);

  //
  // load texture image using webgl2fundamentals boilerplate
  // initially creates just a 1x1 blue pixel as a placeholder
  // replaced by actual texture image once loaded
  //


  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA,
                gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

  var image = new Image();
  image.src = "illinois512.png";
  
  image.addEventListener("load", function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 512, 512, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
  });

  //
  // set up second texture and sampler
  //

  texture2 = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture2);
  gl.activeTexture(gl.TEXTURE0);

  var sampler2 = gl.createSampler();
  gl.bindSampler(1, sampler2);

  //
  // load texture image using webgl2fundamentals boilerplate
  // initially creates just a 1x1 blue pixel as a placeholder
  // replaced by actual texture image once loaded
  //

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA,
                gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

  var image2 = new Image();
  image2.src = "stadium sphere.jpg";

  image2.addEventListener("load", function() {
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, image2);
    gl.generateMipmap(gl.TEXTURE_2D);
  });
}