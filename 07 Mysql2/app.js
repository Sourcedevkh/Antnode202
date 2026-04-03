const express = require('express');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoriesRoute');

const app = express();
app.use(express.json());
const PORT = 3000;

app.use(productRoute);
app.use(categoryRoute);


app.delete('/categories/:id', async(req, res) =>{
    try {
        let id = req.params.id;
        let [rows] = await pool.execute('DELETE FROM category WHERE id = ?', [id]);
        if(rows.affectedRows > 0){
            res.status(200).json({
                success: true,
                msg: 'Category deleted successfully',
            })
        }else{
            res.status(404).json({
                success: false,
                msg: 'Category not found!'
            })  
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error deleting category'
        });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})

