'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Ingredients", [
      {
        name: 'Cabbage',
        image: 'https://www.freshpoint.com/wp-content/uploads/2020/02/Freshpoint-green-cabbage.jpg',
      },
      {
        name: 'Kale',
        image: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQKTQ8_nIRsYQnbuY1lkCshW7rszXXuhm7VCJKVoVfKNgXuEC7nTbMRNsmi07fvDRa6i94qp8mi-bWzubEetQ&s=19',
      },
      {
        name: 'Onion',
        image: 'https://images.unsplash.com/photo-1585849834908-3481231155e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8b25pb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      },
       {
        name: 'asparagus',
        image: 'https://cdn.tgdd.vn/Files/2022/07/10/1446365/cach-lam-uc-ga-xao-mang-tay-dam-vi-hap-dan-boi-bo-ca-nha-202207102114416270.jpg'
      },
      {
        name: 'chicken breast',
        image: 'https://cdn.tgdd.vn/2020/12/content/3-800x500-6.jpg'
      },
      {
        name: 'Pork',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Schweinebauch-2.jpg/220px-Schweinebauch-2.jpg'
      },
       {
        name: 'Bell pepper',
        image: 'https://www.chilipeppermadness.com/wp-content/uploads/2019/08/Bell-Peppers.jpg'
      },
      {
        name: 'Beef',
        image: 'https://vcdn1-giadinh.vnecdn.net/2022/10/10/-5657-1665394119.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=SPNi8mtRi5xp5EaVYj5Fbw'
      },
       {
        name: 'Celery',
        image: 'https://www.thespruceeats.com/thmb/h5_OYBELY8-WXAbSF2RLJ3evrJg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/what-is-celery-5199268-hero-01-cb9c645dfb614f0a8eef5b0c316ce16d.jpg'
      },
       {
        name: 'Salmon',
        image: 'https://naturallyvietnam.com/wp-content/uploads/2020/05/Norway-Salmon.jpg'
      },
      {
        name: 'Orange',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Oranges_-_whole-halved-segment.jpg/640px-Oranges_-_whole-halved-segment.jpg'
      },
      {
        name: 'Margarine',
        image: 'https://www.tuongan.com.vn/public/uploads/2019/c%E1%BB%A5m%20b%C6%A1_2.png'
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
