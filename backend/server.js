import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import User from './User.js';
import Property from './Property.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// User Registration Route
app.post('/api/users/register', (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
  });


// User Login Route
app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;
  
    // Find user by email
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(404).json({ email: 'User not found' });
        }
  
        // Check password
        // Note: This assumes that you're storing hashed passwords, not plain text
        // You would typically use a library like bcrypt to compare the hashed password
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              // User matched
              // Create JWT Payload
              const payload = { id: user.id, name: user.name };
  
              // Sign token
              jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
            } else {
              return res.status(400).json({ password: 'Password incorrect' });
            }
          });
      });
  });
  

// Create Property Route
app.post('/api/properties', (req, res) => {
    const newProperty = new Property(req.body);
    newProperty.save()
      .then(property => res.json(property))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// Read Property Route
app.get('/api/properties/:id', (req, res) => {
    Property.findById(req.params.id)
      .then(property => res.json(property))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// Update Property Route
app.put('/api/properties/:id', (req, res) => {
    Property.findById(req.params.id)
      .then(property => {
        // Update the property's attributes here
        property.save()
          .then(() => res.json('Property updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

// Delete Property Route
app.delete('/api/properties/:id', (req, res) => {
    Property.findByIdAndDelete(req.params.id)
      .then(() => res.json('Property deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  app.post('/api/properties/interest', (req, res) => {
    const { buyer, property } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mohanvaddella@gmail.com',
        pass: 'Moho@123'
      }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: `${buyer.email}, ${property.seller.email}`,
        subject: 'Someone is interested in your property!',
        text: `Buyer ${buyer.name} is interested in property ${property.title}.`
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send(info.response);
        }
      });
    });

    import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.post('/send-email', (req, res) => {
  const msg = {
    to: req.body.to,
    from: req.body.from,
    subject: 'New Property Interest',
    text: req.body.message,
  };

  sgMail
    .send(msg)
    .then(() => res.status(200).send('Email sent'))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




