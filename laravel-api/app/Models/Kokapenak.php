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
	protected $primaryKey = 'IdKokapen';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'IdKokapen' => 'int'
	];

	protected $fillable = [
		'Latitudea',
		'Longitudea',
		'Irudia',
		'Izena'
	];

	public function jokoaks()
	{
		return $this->hasMany(Jokoak::class, 'IdKokapen');
	}
}
