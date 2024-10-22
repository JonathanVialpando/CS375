/////////////////////////////////////////////////////////////////////////////
//
//  ExperimentalCube.js
//
//  A cube defined using gl.TRIANGLE_FAN
//

class ExperimentalCube {
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

        const positions = new Float32Array([

            -0.5, -0.5, 0.5,   
            -0.5, -0.5, 0.5, 
            0.5, -0.5, 0.5,  
            0.5,  0.5, 0.5, 
            -0.5,  0.5, 0.5, 
 
            -0.5, -0.5, -0.5,  
            -0.5, -0.5, -0.5, 
            0.5, -0.5, -0.5,  
            0.5,  0.5, -0.5,  
            -0.5,  0.5, -0.5, 

            -0.5, -0.5, -0.5,   
            -0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,  
            -0.5,  0.5, 0.5,  
            -0.5,  0.5, -0.5, 

            0.5, -0.5, -0.5,   
            0.5, -0.5, -0.5,  
            0.5, -0.5, 0.5,   
            0.5,  0.5, 0.5,  
            0.5,  0.5, -0.5,  
        
            -0.5, 0.5, -0.5,   
            -0.5, 0.5, -0.5, 
            0.5, 0.5, -0.5, 
            0.5, 0.5, 0.5,   
            -0.5, 0.5, 0.5,  
            
            -0.5, -0.5, -0.5, 
            -0.5, -0.5, -0.5, 
            0.5, -0.5, -0.5,  
            0.5, -0.5, 0.5,   
            -0.5, -0.5, 0.5   

        ]);

        let aPosition = new Attribute(gl, program, "aPosition", positions, 3, gl.FLOAT);

        const colors = new Uint8Array([
            
            0, 255, 0, 255, 
            0, 255, 0, 255, 
            0, 255, 0, 255, 
            0, 255, 0, 255, 
            0, 255, 0, 255, 

            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,

            128, 0, 128, 255, 
            128, 0, 128, 255, 
            128, 0, 128, 255, 
            128, 0, 128, 255, 
            128, 0, 128, 255, 

            255, 105, 180, 255, 
            255, 105, 180, 255, 
            255, 105, 180, 255, 
            255, 105, 180, 255, 
            255, 105, 180, 255, 

            255, 255, 0, 255, 
            255, 255, 0, 255, 
            255, 255, 0, 255, 
            255, 255, 0, 255,
            255, 255, 0, 255, 

            255, 255, 0, 255, 
            255, 255, 0, 255, 
            255, 255, 0, 255, 
            255, 255, 0, 255, 
            255, 255, 0, 255  
        ]);

        let aColor = new Attribute(gl, program, "aColor", colors, 4, gl.UNSIGNED_BYTE, true); 

        this.draw = () => {
            program.use();
            aPosition.enable();
            aColor.enable();
            for (let i = 0; i < 6; i++) {
                gl.drawArrays(gl.TRIANGLE_FAN, i * 5, 5);
            }
            aColor.disable();
            aPosition.disable();
        };
    }
};