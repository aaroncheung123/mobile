import EliteModel from '../elite-model';

export default class EliteSiteFile extends EliteModel {

  primaryKey = 'site_file_id';
  dataModel = 'site_file';
  dataModelPlural = 'site_files';
}