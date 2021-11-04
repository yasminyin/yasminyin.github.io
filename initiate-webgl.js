function initwebgl() {

  //
  // create a graphics context
  //

  var canvas = document.getElementById("myGLCanvas");
  gl = canvas.getContext("webgl2");
  if (!gl)
    alert("Failed to create WebGL context!");

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  loadshaders(vs,fs);

  // set up vertex array object
 
  teapot_vao = gl.createVertexArray();
  gl.bindVertexArray(teapot_vao);

  // create a coordinate buffer of vertex positions and
  // connect it to the vertex shader positions
 
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(teapot.positions),
                gl.STATIC_DRAW);

  gl.enableVertexAttribArray(vert_pos_attr);
  gl.vertexAttribPointer(vert_pos_attr, 3, gl.FLOAT, false, 0, 0);

  // create a coordinate buffer of vertex positions and
  // connect it to the vertex shader positions
  // but normalize the normals first

  var x,y,z,d;
  for (var i = 0; i < teapot.normals.length; i += 3) {
    x = teapot.normals[i];
    y = teapot.normals[i+1];
    z = teapot.normals[i+2];

    d = 1.0/Math.sqrt(x*x + y*y + z*z);

    teapot.normals[i] *= d;
    teapot.normals[i+1] *= d;
    teapot.normals[i+2] *= d;
  }

  // setnormals(teapot.positions, teapot.normals, teapot.faces);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(teapot.normals),
                gl.STATIC_DRAW);

  gl.enableVertexAttribArray(vert_normal_attr);
  gl.vertexAttribPointer(vert_normal_attr, 3, gl.FLOAT, false, 0, 0);

  // create an index buffer of triangle faces

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer()); 
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(teapot.faces),
                gl.STATIC_DRAW);

  
  //
  // set up color
  //
  var color = [];
  for (var i = 0; i < teapot.normals.length; i++) {
      color.push(1.0);
      color.push(0.0);
      color.push(1.0);
      color.push(1);
  }

  // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
  //             new Float32Array(color),
  //             gl.STATIC_DRAW);


  //
  // set up transformation matrices
  //

  projection = glMatrix.mat4.create();
  glMatrix.mat4.perspective(projection, Math.PI/6, 1.0, 0.1);

  requestAnimationFrame(draw);
}

function loadshaders(vertexShaderSource,fragmentShaderSource) {
  var vstextbox = document.getElementById("vertexshader");

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
    alert("Vertex Shader Error:\n" + gl.getShaderInfoLog(vertexShader));

  var fstextbox = document.getElementById("fragmentshader");

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
    alert("Fragment Shader Error:\n" + gl.getShaderInfoLog(fragmentShader));

  //
  // Compile shaders and get link ID's to the attributes and uniforms
  //

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
    alert("Failed to setup shaders");

  vert_pos_attr = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  vert_normal_attr = gl.getAttribLocation(shaderProgram, "aVertexNormal");
  modelview_uniform = gl.getUniformLocation(shaderProgram, "uModelViewMatrix"); 
  normal_uniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix"); 
  projection_uniform = gl.getUniformLocation(shaderProgram, "uProjectionMatrix"); 
  sampler_uniform = gl.getUniformLocation(shaderProgram, "uSampler"); 
  sampler2_uniform = gl.getUniformLocation(shaderProgram, "uSampler2"); 
  vert_texcoord_attr = gl.getAttribLocation(shaderProgram, "aTexCoord");
}