<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Jokoak
 * 
 * @property int $Id
 * @property int|null $IdKokapen
 * @property string|null $Izenburua
 * @property string|null $Azalpena
 * 
 * @property Kokapenak|null $kokapenak
 * @property Collection|Baliabideak[] $baliabideaks
 *
 * @package App\Models
 */
class Jokoak extends Model
{
	protected $table = 'jokoak';
	protected $primaryKey = 'Id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'Id' => 'int',
		'IdKokapen' => 'int'
	];

	protected $fillable = [
		'IdKokapen',
		'Izenburua',
		'Azalpena'
	];

	public function kokapenak()
	{
		return $this->belongsTo(Kokapenak::class, 'IdKokapen');
	}

	public function baliabideaks()
	{
		return $this->hasMany(Baliabideak::class, 'IdJokoa');
	}
}
