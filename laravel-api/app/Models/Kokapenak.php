<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Kokapenak
 * 
 * @property int $IdKokapen
 * @property string|null $Latitudea
 * @property string|null $Longitudea
 * 
 * @property Collection|Jokoak[] $jokoaks
 *
 * @package App\Models
 */
class Kokapenak extends Model
{
	protected $table = 'kokapenak';
	protected $primaryKey = 'IdKokapena';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'IdKokapena' => 'int'
	];

	protected $fillable = [
		'Latitudea',
		'Longitudea',
		'Irudia',
		'Izena',
		'Deskribapena'
	];

	public function jokoaks()
	{
		return $this->hasMany(Jokoak::class, 'IdKokapena');
	}
}
