// Quiz data organized by levels with randomized correct answer positions
const levels = {
    1: {
        title: "Level 1: Beginner",
        icon: "🤖",
        description: "ML Fundamentals & Basic Concepts",
        questions: [
            {
                question: "What is Machine Learning?",
                options: [
                    "A programming language",
                    "A type of computer hardware",
                    "The ability of computers to learn from data without being explicitly programmed",
                    "A database management system"
                ],
                correct: 2
            },
            {
                question: "Which of these is a supervised learning task?",
                options: [
                    "Finding patterns in data without labels",
                    "Clustering customers into groups",
                    "Reducing the number of features in a dataset",
                    "Predicting house prices based on features"
                ],
                correct: 3
            },
            {
                question: "What is the purpose of a training dataset?",
                options: [
                    "To teach the model patterns and relationships",
                    "To validate hyperparameters",
                    "To test the final model's performance",
                    "To store all the data permanently"
                ],
                correct: 0
            },
            {
                question: "What does 'overfitting' mean in machine learning?",
                options: [
                    "The model has too few parameters",
                    "The training process takes too long",
                    "The model is too simple",
                    "The model performs well on training data but poorly on new data"
                ],
                correct: 3
            },
            {
                question: "Which algorithm is commonly used for classification tasks?",
                options: [
                    "K-Means Clustering",
                    "Decision Trees",
                    "Linear Regression",
                    "Principal Component Analysis"
                ],
                correct: 1
            },
            {
                question: "What is a 'feature' in machine learning?",
                options: [
                    "A type of neural network",
                    "The final output of the model",
                    "An input variable used to make predictions",
                    "An error in the model"
                ],
                correct: 2
            },
            {
                question: "What is the difference between classification and regression?",
                options: [
                    "Classification predicts categories, regression predicts continuous values",
                    "There is no difference",
                    "Classification is supervised, regression is unsupervised",
                    "Classification uses neural networks, regression doesn't"
                ],
                correct: 0
            },
            {
                question: "What is the purpose of a validation dataset?",
                options: [
                    "To increase the dataset size",
                    "To train the model",
                    "To tune hyperparameters and evaluate model during training",
                    "To permanently store all predictions"
                ],
                correct: 2
            },
            {
                question: "Which of these is an example of unsupervised learning?",
                options: [
                    "Image classification",
                    "Customer segmentation through clustering",
                    "Stock price prediction",
                    "Email spam detection"
                ],
                correct: 1
            },
            {
                question: "What does 'accuracy' measure in a classification model?",
                options: [
                    "The percentage of correct predictions",
                    "The amount of data used",
                    "The number of features",
                    "How fast the model runs"
                ],
                correct: 0
            },
            {
                question: "What is a neural network inspired by?",
                options: [
                    "Cloud computing",
                    "Database structures",
                    "Computer processors",
                    "The human brain"
                ],
                correct: 3
            },
            {
                question: "What is 'bias' in machine learning?",
                options: [
                    "The programming language used",
                    "A statistical term referring to systematic error in predictions",
                    "The size of the dataset",
                    "The speed of the algorithm"
                ],
                correct: 1
            }
        ]
    },
    2: {
        title: "Level 2: Intermediate",
        icon: "🧠",
        description: "Algorithms & Model Evaluation",
        questions: [
            {
                question: "What is the purpose of cross-validation?",
                options: [
                    "To reduce the dataset size",
                    "To assess model performance on different subsets of data",
                    "To select features automatically",
                    "To speed up training"
                ],
                correct: 1
            },
            {
                question: "What is gradient descent used for?",
                options: [
                    "Feature selection",
                    "Data visualization",
                    "Data preprocessing",
                    "Optimizing model parameters to minimize loss"
                ],
                correct: 3
            },
            {
                question: "What is the 'kernel trick' in SVM?",
                options: [
                    "A method to map data into higher dimensions without explicit computation",
                    "A type of neural network layer",
                    "A way to speed up training",
                    "A data preprocessing technique"
                ],
                correct: 0
            },
            {
                question: "What is precision in classification metrics?",
                options: [
                    "The speed of the model",
                    "True positives divided by (true positives + false negatives)",
                    "Total correct predictions divided by total predictions",
                    "True positives divided by (true positives + false positives)"
                ],
                correct: 3
            },
            {
                question: "What is regularization used for?",
                options: [
                    "To increase model complexity",
                    "To prevent overfitting by adding a penalty term",
                    "To collect more data",
                    "To speed up training"
                ],
                correct: 1
            },
            {
                question: "What does the ROC curve illustrate?",
                options: [
                    "Precision vs recall",
                    "Training time vs accuracy",
                    "Training loss over epochs",
                    "True positive rate vs false positive rate"
                ],
                correct: 3
            },
            {
                question: "What is ensemble learning?",
                options: [
                    "Combining multiple models to improve performance",
                    "Parallel processing of data",
                    "Using multiple datasets",
                    "Training one very large model"
                ],
                correct: 0
            },
            {
                question: "What is the curse of dimensionality?",
                options: [
                    "Long training times",
                    "Performance degradation as feature space dimensions increase",
                    "Too many rows in a dataset",
                    "Overfitting on training data"
                ],
                correct: 1
            },
            {
                question: "What is bagging in machine learning?",
                options: [
                    "Compressing the model",
                    "Removing outliers from data",
                    "Bootstrap aggregating - training models on random subsets",
                    "Selecting the best features"
                ],
                correct: 2
            },
            {
                question: "What is the F1 score?",
                options: [
                    "The harmonic mean of precision and recall",
                    "The training accuracy",
                    "The first eigenvalue",
                    "The learning rate"
                ],
                correct: 0
            },
            {
                question: "What is feature engineering?",
                options: [
                    "Optimizing hyperparameters",
                    "Creating or transforming features to improve model performance",
                    "Building hardware for ML",
                    "Selecting the best algorithm"
                ],
                correct: 1
            },
            {
                question: "What is the bias-variance tradeoff?",
                options: [
                    "Choosing between two datasets",
                    "Training time vs inference time",
                    "Balancing model simplicity and complexity to minimize error",
                    "Speed vs accuracy"
                ],
                correct: 2
            }
        ]
    },
    3: {
        title: "Level 3: Advanced",
        icon: "🔮",
        description: "Deep Learning & Neural Networks",
        questions: [
            {
                question: "What is backpropagation?",
                options: [
                    "A method to remove bad data",
                    "A type of activation function",
                    "An algorithm for computing gradients in neural networks",
                    "A way to reverse predictions"
                ],
                correct: 2
            },
            {
                question: "What is the vanishing gradient problem?",
                options: [
                    "When gradients become too small during backpropagation",
                    "When the model is too simple",
                    "When the model trains too slowly",
                    "When data is insufficient"
                ],
                correct: 0
            },
            {
                question: "What is the purpose of batch normalization?",
                options: [
                    "To speed up inference",
                    "To organize training data",
                    "To reduce batch size",
                    "To normalize layer inputs and stabilize learning"
                ],
                correct: 3
            },
            {
                question: "What is a convolutional layer primarily used for?",
                options: [
                    "Extracting spatial features from images",
                    "Data normalization",
                    "Time series prediction",
                    "Text processing"
                ],
                correct: 0
            },
            {
                question: "What is the purpose of dropout in neural networks?",
                options: [
                    "To reduce model size",
                    "To speed up training",
                    "To prevent overfitting by randomly deactivating neurons",
                    "To remove bad data"
                ],
                correct: 2
            },
            {
                question: "What is transfer learning?",
                options: [
                    "Moving data between computers",
                    "Transferring weights randomly",
                    "Using a pre-trained model as starting point for a new task",
                    "Converting between model types"
                ],
                correct: 2
            },
            {
                question: "What is an autoencoder?",
                options: [
                    "A data labeling tool",
                    "A neural network that learns to reconstruct its input",
                    "A type of optimizer",
                    "A compression algorithm"
                ],
                correct: 1
            },
            {
                question: "What is the attention mechanism in deep learning?",
                options: [
                    "A regularization technique",
                    "A method to weigh importance of different input parts",
                    "A type of activation function",
                    "A way to focus training on specific data"
                ],
                correct: 1
            },
            {
                question: "What is a GAN (Generative Adversarial Network)?",
                options: [
                    "A clustering algorithm",
                    "A type of RNN",
                    "Two networks competing: generator and discriminator",
                    "A single powerful network"
                ],
                correct: 2
            },
            {
                question: "What is the purpose of pooling layers in CNNs?",
                options: [
                    "To reduce spatial dimensions and computation",
                    "To normalize data",
                    "To add more features",
                    "To increase image size"
                ],
                correct: 0
            },
            {
                question: "What is ResNet's key innovation?",
                options: [
                    "Removing pooling layers",
                    "Using very small filters",
                    "Using only one hidden layer",
                    "Skip connections to enable training of very deep networks"
                ],
                correct: 3
            },
            {
                question: "What is the purpose of the softmax function?",
                options: [
                    "To make training softer",
                    "To convert logits into probability distributions",
                    "To speed up convergence",
                    "To reduce overfitting"
                ],
                correct: 1
            }
        ]
    },
    4: {
        title: "Level 4: Expert",
        icon: "🏆",
        description: "Advanced Topics & Research",
        questions: [
            {
                question: "What is the Transformer architecture's main advantage?",
                options: [
                    "Faster training on small datasets",
                    "Parallel processing of sequences via self-attention",
                    "Smaller model size",
                    "Lower memory usage"
                ],
                correct: 1
            },
            {
                question: "What is contrastive learning?",
                options: [
                    "A type of supervised learning",
                    "A data augmentation technique",
                    "Comparing two models",
                    "Learning representations by contrasting similar and dissimilar pairs"
                ],
                correct: 3
            },
            {
                question: "What is few-shot learning?",
                options: [
                    "Learning from a small number of examples per class",
                    "Using a small neural network",
                    "Training on a single GPU",
                    "Training with very few epochs"
                ],
                correct: 0
            },
            {
                question: "What is meta-learning?",
                options: [
                    "Pre-training on large datasets",
                    "Learning metadata",
                    "Learning how to learn - optimizing learning algorithms",
                    "Learning about data"
                ],
                correct: 2
            },
            {
                question: "What is the purpose of knowledge distillation?",
                options: [
                    "Removing unnecessary features",
                    "Compressing datasets",
                    "Transferring knowledge from large model to smaller one",
                    "Extracting knowledge from data"
                ],
                correct: 2
            },
            {
                question: "What is Neural Architecture Search (NAS)?",
                options: [
                    "Optimizing hyperparameters",
                    "Automatically discovering optimal neural network architectures",
                    "Finding bugs in code",
                    "Searching for training data"
                ],
                correct: 1
            },
            {
                question: "What is self-supervised learning?",
                options: [
                    "Learning from unlabeled data by creating pretext tasks",
                    "Supervised learning without a teacher",
                    "Transfer learning",
                    "Models that train themselves"
                ],
                correct: 0
            },
            {
                question: "What is the BERT model's key innovation?",
                options: [
                    "Very large vocabulary",
                    "Bidirectional training of Transformers for language understanding",
                    "Character-level processing",
                    "Using RNNs"
                ],
                correct: 1
            },
            {
                question: "What is diffusion model's core concept?",
                options: [
                    "Diffusing gradients",
                    "Distributing training across GPUs",
                    "Learning to reverse a gradual noising process",
                    "Spreading information across layers"
                ],
                correct: 2
            },
            {
                question: "What is reinforcement learning from human feedback (RLHF)?",
                options: [
                    "Using human preferences to fine-tune models via RL",
                    "Human-in-the-loop training",
                    "Humans labeling training data",
                    "Feedback on model architecture"
                ],
                correct: 0
            },
            {
                question: "What is quantization in model optimization?",
                options: [
                    "Reducing numerical precision of weights for efficiency",
                    "Selecting important features",
                    "Reducing batch size",
                    "Pruning layers"
                ],
                correct: 0
            },
            {
                question: "What is the purpose of LoRA (Low-Rank Adaptation)?",
                options: [
                    "Compressing images",
                    "Efficient fine-tuning by learning low-rank updates",
                    "Optimizing learning rate",
                    "Reducing training data"
                ],
                correct: 1
            }
        ]
    }
};