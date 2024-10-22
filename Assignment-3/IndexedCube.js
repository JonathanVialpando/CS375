/////////////////////////////////////////////////////////////////////////////
//
//  IndexedCube.js
//
//  A cube defined of 12 triangles using vertex indices.
//

class IndexedCube {
    constructor(gl, vertexShader, fragmentShader) {
        vertexShader ||= `
            in vec4 aPosition;
            in vec4 aColor;

            out vec4 vColor;

            uniform mat4 P;
            uniform mat4 MV;

            void main() {
                vColor = aColor;
                gl_Position = P * MV * aPosition;
            }
        `;

        fragmentShader ||=`
            in vec4 vColor;

            out vec4 fColor;
    
            void main() {
                fColor = vColor;
            }
        `;

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        let positions = new Float32Array([
            -0.5, -0.5, -0.5, 
            0.5, -0.5, -0.5,  
            -0.5,  0.5, -0.5,  
            0.5,  0.5, -0.5, 
            -0.5, -0.5, 0.5,   
            0.5, -0.5, 0.5,  
            -0.5,  0.5, 0.5,   
            0.5,  0.5, 0.5,  
        ])

        let aPosition = new Attribute(gl, program, "aPosition", positions, 3, gl.FLOAT);

        let colors = new Uint8Array([
            0, 255, 0,  
            0, 255, 0, 
            0, 0, 255,  
            0, 0, 255,  
            128, 0, 128,
            128, 0, 128,
            255, 105, 180,
            255, 105, 180,
            255, 255, 0,
            255, 255, 0,
            255, 255, 255,
            255, 255, 255,
        ]);

        let aColor = new Attribute(gl, program, "aColor", colors, 3,  gl.UNSIGNED_BYTE, true);

        let indices = new Uint16Array([
            0, 1, 5,
            0, 3, 1,
            0, 4, 6,
            0, 6, 2,
            1, 3, 5,
            2, 3, 0,
            2, 6, 7,
            4, 0, 5,
            4, 5, 6,
            5, 7, 6,
            7, 5, 3,
            7, 3, 2,
        ]);
        
        indices = new Indices(gl, indices);

        this.draw = () => {

            program.use();
            aPosition.enable();
            aColor.enable();
            indices.enable();
            gl.drawElements(gl.TRIANGLES, indices.count, indices.type, 0);
            aColor.disable();
            aPosition.disable();
        };
    }
};
