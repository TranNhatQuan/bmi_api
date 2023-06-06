'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Exercises", [
      {
        name: "Full body workout",
        info: "Engage your entire body with a variety of exercises targeting strength, endurance, and flexibility. Achieve a balanced and toned physique",
        calories: 400,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaKOCBoSDpf2ibE6wJbeZQOPNS9E-Q1jTgEA&usqp=CAU",
        level: 1,
        points: 0,
      },
      {
        name: "Upper body workout",
        info: "Sculpt and strengthen your upper body with exercises focusing on the arms, chest, shoulders, and back.",
        calories: 300,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaKOCBoSDpf2ibE6wJbeZQOPNS9E-Q1jTgEA&usqp=CAU",
        level: 2,points: 0,
      },
      {
        name: "Lower body workout",
        info: "Tone and strengthen your lower body with exercises targeting the legs, hips, and glutes",
        calories: 300,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaKOCBoSDpf2ibE6wJbeZQOPNS9E-Q1jTgEA&usqp=CAU",
        level: 3,points: 0,
      },
        {
        name: "Dumbell Walking Lunge",
        info: "Step forward with dumbbells at your sides, alternating legs, engaging multiple muscles for improved leg strength, stability, and coordination.",
        calories: 250,
        image: "https://i.pinimg.com/564x/45/cf/bf/45cfbf33513048d451c8ab0898c0f2a8.jpg",
        level: 2,points: 0,
      },
        {
        name: "Squats",
        info: "Bend your knees, lower your hips while keeping your back straight, then rise back up, targeting your leg muscles for strength and stability.",
        calories: 250,
        image: "https://i.pinimg.com/564x/45/cf/bf/45cfbf33513048d451c8ab0898c0f2a8.jpg",
        level: 2,points: 0,
      },
      {
        name: "military press",
        info: "Military Press: Lift a barbell from shoulder level to above the head, targeting the shoulder and arm muscles for increased upper body strength and shoulder stability.",
        calories: 350,
        image: "https://www.inspireusafoundation.org/wp-content/uploads/2022/04/military-press.gif",
        level: 3,points: 0,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
