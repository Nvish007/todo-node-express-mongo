
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  
//   userSchema.pre('save', async function (next) {
//     try {
//       // Only hash the password if it has been modified (or is new)
//       if (!this.isModified('password')) {
//         return next();
//       }
  
//       // Generate a salt
//       const salt = await bcrypt.genSalt(10);
  
//       // Hash the password along with the new salt
//       const hashedPassword = await bcrypt.hash(this.password, salt);
  
//       // Replace the plain text password with the hashed one
//       this.password = hashedPassword;
  
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });
  
//   // Method to compare entered password with the hashed password in the database
//   userSchema.methods.comparePassword = async function (candidatePassword) {
//     try {
//       return await bcrypt.compare(candidatePassword, this.password);
//     } catch (error) {
//       throw error;
//     }
//   };


const User = mongoose.model('User', userSchema);

module.exports = User;
