/////////////////////////////////////////////////////////////////////////////
//
//  BasicCube.js
//
//  A cube defined of 12 triangles
//

class BasicCube {
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
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
           -0.5,  0.5, 0.5,
       
            0.5, -0.5, 0.5,
            0.5,  0.5, 0.5,
           -0.5,  0.5, 0.5,
       
           -0.5, -0.5, -0.5,
            0.5,  0.5, -0.5,
            0.5, -0.5, -0.5,
       
           -0.5,  0.5, -0.5,
            0.5,  0.5, -0.5,
           -0.5, -0.5, -0.5,
       
           -0.5, -0.5, -0.5,
           -0.5,  0.5, 0.5,
           -0.5,  0.5, -0.5,
       
           -0.5, -0.5, -0.5,
           -0.5, -0.5, 0.5,
           -0.5,  0.5, 0.5,
       
           0.5, -0.5, -0.5,
           0.5,  0.5, -0.5,
           0.5, -0.5, 0.5,
       
           0.5,  0.5, 0.5,
           0.5, -0.5, 0.5,
           0.5,  0.5, -0.5,
       
           -0.5,  0.5, -0.5,
           -0.5,  0.5, 0.5,
            0.5,  0.5, 0.5,
       
            0.5,  0.5, 0.5,
            0.5,  0.5, -0.5,
           -0.5,  0.5, -0.5,
       
           -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
       
           -0.5, -0.5, 0.5,
           -0.5, -0.5, -0.5,
            0.5, -0.5, 0.5

       ]);

       let aPosition = new Attribute(gl, program, "aPosition",positions, 3, gl.FLOAT);

       let colors = new Uint8Array([
            0, 255, 0,  
            0, 255, 0, 
            0, 255, 0, 
            0, 255, 0,  
            0, 255, 0, 
            0, 255, 0, 
            0, 0, 255,  
            0, 0, 255, 
            0, 0, 255,  
            0, 0, 255,  
            0, 0, 255, 
            0, 0, 255,  
            128, 0, 128,
            128, 0, 128,
            128, 0, 128,
            128, 0, 128,
            128, 0, 128,
            128, 0, 128,
            255, 105, 180,
            255, 105, 180,
            255, 105, 180,
            255, 105, 180,
            255, 105, 180,
            255, 105, 180,
            255, 255, 0,
            255, 255, 0,
            255, 255, 0,
            255, 255, 0,
            255, 255, 0,
            255, 255, 0,
            255, 255, 255,
            255, 255, 255,
            255, 255, 255,
            255, 255, 255,
            255, 255, 255,
            255, 255, 255,
            
       ]);

       let aColor = new Attribute(gl, program, "aColor",colors, 3, gl.UNSIGNED_BYTE, true);

        this.draw = () => {
            program.use();
            aPosition.enable();
            aColor.enable();
            gl.drawArrays(gl.TRIANGLES, 0, aPosition.count);
            aColor.disable();
            aPosition.disable();
        };
    }
};