function setnormals(positions, normals, faces) {
    for (var i = 0; i < faces.length; i += 3) {
        // -- FACE --
        var vertex1 = glMatrix.vec3.fromValues(positions[faces[i]*3], positions[faces[i]*3+1], positions[faces[i]*3+2]);
        var vertex2 = glMatrix.vec3.fromValues(positions[faces[i+1]*3], positions[faces[i+1]*3+1], positions[faces[i+1]*3+2]);
        var vertex3 = glMatrix.vec3.fromValues(positions[faces[i+2]*3], positions[faces[i+2]*3+1], positions[faces[i+2]*3+2]);

        // Normal of the face
        var v1 = glMatrix.vec3.create();
        var v2 = glMatrix.vec3.create();
        var normal_face = glMatrix.vec3.create();
        glMatrix.vec3.subtract(v1, vertex2, vertex1);
        glMatrix.vec3.subtract(v2, vertex3, vertex1);
        glMatrix.vec3.cross(normal_face, v1, v2);

        normals[faces[i]*3  ] += normal_face[0];
        normals[faces[i]*3+1] += normal_face[1];
        normals[faces[i]*3+2] += normal_face[2];

        normals[faces[i+1]*3  ] += normal_face[0];
        normals[faces[i+1]*3+1] += normal_face[1];
        normals[faces[i+1]*3+2] += normal_face[2];

        normals[faces[i+2]*3  ] += normal_face[0];
        normals[faces[i+2]*3+1] += normal_face[1];
        normals[faces[i+2]*3+2] += normal_face[2];
    }

    for (var i = 0; i < normals.length; i += 3) {
        var vertex = glMatrix.vec3.fromValues(normals[i], normals[i+1], normals[i+2]);
        glMatrix.vec3.normalize(vertex, vertex);
        normals[i  ] = vertex[0];
        normals[i+1] = vertex[1];
        normals[i+2] = vertex[2];
    }
    return normals;
}