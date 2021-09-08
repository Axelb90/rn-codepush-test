export default parameters = [
  {
    taskType: 'PRUNNING',
    productType: 'TOV',
    version: 1,
    fields: [
      {
        field_id: 'issue',
        field_label: '',
        field_value: '',
        field_mandatory: true,
        field_type: 'radioButton',
        field_options: [
          {
            option_label: 'PRE-OP',
          },
          {
            option_label: 'NUMBER',
          },
          {
            option_label: 'MISSED',
          },
          {
            option_label: 'SHOOTS/DOUBLES',
          },
          {
            option_label: 'BOATS/CATFACE',
          },
          {
            option_label: 'SANITATION',
          },
          {
            option_label: 'OTHER',
          },
        ],
      },
      {
        field_id: 'photo',
        field_label: 'TAKE A PHOTO',
        field_mandatory: false,
        field_type: 'camera',
      },
      {
        field_id: 'followUp',
        field_label: 'FLAG FOR FOLLOW UP',
        field_mandatory: false,
        field_type: 'checkbox',
        field_value: false,
      }
    ],
  },
];
